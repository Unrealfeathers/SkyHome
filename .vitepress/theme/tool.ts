import fs from 'fs'
import path from 'path'

const docsDir = '../../docs'


export function getSidebar() {
    const mdDir = path.resolve(__dirname, docsDir)
    const folders = fs.readdirSync(mdDir).filter(file => file !=='public' && fs.statSync(path.join(mdDir, file)).isDirectory())
    
    return folders.map(folder => ({
        text: folder.replace(/^\d+\s*-\s*/, '')
    }))
}

export function scrollToAnchor(id: string) {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}