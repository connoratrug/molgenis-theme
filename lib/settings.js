import {__dirname} from './utils.js'
import fs from 'fs-extra'
import path from 'path'
import ini from 'ini'


export default async() => {
    const settings = {
        dir: {
            base: path.resolve('.'),
        }
    }

    settings.includePaths = [
        path.join(settings.dir.base, 'node_modules'),
        path.join(settings.dir.base, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
        path.join(settings.dir.base, 'scss')
    ]

    settings.dir.css = path.join(settings.dir.base, 'css')
    settings.dir.node = path.resolve(path.join(settings.dir.base, 'node_modules'))
    let defaults
    try {
        defaults = ini.parse((await fs.readFile(path.join(settings.dir.base, '.env'), 'utf8')))
    } catch (err) {
        // Using .env file fallback to accomodate CI builds.
        console.log('using .env.defaults')
        defaults = ini.parse((await fs.readFile(path.join(settings.dir.base, '.env.defaults'), 'utf8')))
    }

    settings.dir.theme = path.resolve(path.join(settings.dir.base, 'theme'))
    Object.assign(settings, defaults)

    return settings
}