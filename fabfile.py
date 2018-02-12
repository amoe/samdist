# fabfile.py

from fabric.api \
  import run, cd, local, settings, hide, abort, env, sudo

import time
import hashlib

# We really need one dir to contain the python stuff

DEPLOYMENT_TARGET_DIRECTORY = '/usr/local/lib/samdist'
DEPLOYMENT_TARGET_DIRECTORY_FE = '/srv/http/samdist'

# Nice two layers of indirection going on here ;)
def build():
    local("yarn build")

# because we can't combine rsync and sudo, we have to do this fairly silly
# rigmarole        
def deploy(source, target):
    temporary_path = generate_temporary_directory(target)
    with hide('running'):
        local(
            "rsync -a --delete --exclude-from=exclude.rsf %s/ %s:%s/" \
              % (source, env['host_string'], temporary_path)
        )
    sudo("mkdir -p %s" % (target,))
    sudo("rsync -rtv --delete %s/ %s/" % (temporary_path, target))
    with hide('running'): run("rm -rf %s" % temporary_path)
    
def deploy_frontend():
    deploy('./dist', DEPLOYMENT_TARGET_DIRECTORY_FE)

def deploy_backend():
    deploy(".", DEPLOYMENT_TARGET_DIRECTORY)
   
# algorithm copied from fabric core code for 'put' with 'use_sudo' kwargs
def generate_temporary_directory(remote_path):
    hasher = hashlib.sha1()
    hasher.update(env['host_string'])
    hasher.update(remote_path)
    return hasher.hexdigest()
