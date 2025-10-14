import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import project from './schemaTypes/project'

export default defineConfig({
  name: 'default',
  title: 'interior-design-portfolio',

  projectId: '22xxdrf2',
  dataset: 'project',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [project],
  },
})
