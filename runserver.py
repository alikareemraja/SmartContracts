#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from project import app
from flask_debugtoolbar import DebugToolbarExtension

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run('0.0.0.0', port=port)
