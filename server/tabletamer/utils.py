import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent


def init_environ(func):
    env = environ.Env(DEBUG=(bool, False))
    env_file = os.path.join(BASE_DIR, ".env")
    env.read_env(env_file)

    def wrapper(*args, **kwargs):
        result = func(env, *args, **kwargs)
        return result
    return wrapper


@init_environ
def get_settings_module(env: environ.Env) -> str:
    return "tabletamer.settings.local" if env.bool("DEBUG") else "tabletamer.settings.production"
