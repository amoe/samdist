The graph rendering function is located in CharacterisingFunctions.display_list()

The data structure is like an optional label type indicating the corpus size, and
the actual data which is a list of counts.
The data is sorted and then limited at 'cutoff'.  If no cutoff then everything
will be rendered.

corpussize is used because the value is formatted as a simple percentage.
It seems that corpussize could be calculated from the data set, so this is being
used probably for performance, or as a more simple flag that's just
used to specify whether the data should be presented as percentages or just as
raw numbers.
