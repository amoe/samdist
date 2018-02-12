# fabfile.py

from fabric.api \
  import run, cd, local, settings, hide, abort, env, sudo

import time
import hashlib

DEPLOYMENT_TARGET_DIRECTORY = '/srv/http/samdist'

# because we can't combine rsync and sudo, we have to do this fairly silly
# rigmarole        
def deploy():
    temporary_path = generate_temporary_directory(DEPLOYMENT_TARGET_DIRECTORY)
    with hide('running'):
        local(
            "rsync -a --delete --exclude-from=exclude.rsf ./ %s:%s/" \
              % (env['host_string'], temporary_path)
        )
    sudo("mkdir -p %s" % (DEPLOYMENT_TARGET_DIRECTORY,))
    sudo("rsync -rtv --delete %s/ %s/" % (temporary_path, DEPLOYMENT_TARGET_DIRECTORY))
    with hide('running'): run("rm -rf %s" % temporary_path)
   
# algorithm copied from fabric core code for 'put' with 'use_sudo' kwargs
def generate_temporary_directory(remote_path):
    hasher = hashlib.sha1()
    hasher.update(env['host_string'])
    hasher.update(remote_path)
    return hasher.hexdigest()
