from .local import *

STATIC_URL = '/api/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'api/static')

MEDIA_URL = '/api/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media')
