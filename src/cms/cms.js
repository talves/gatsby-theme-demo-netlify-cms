import CMS from 'netlify-cms-app'
import {
  previewStyles,
  PostPreview,
  AuthorsPreview,
  GeneralPreview,
  EditorYoutube,
  AnotherYoutube,
  RelationKitchenSinkPostPreview,
} from './components'

CMS.registerPreviewTemplate('posts', PostPreview);
CMS.registerPreviewStyle(previewStyles, { raw: true });
CMS.registerPreviewTemplate('authors', AuthorsPreview);
CMS.registerPreviewTemplate('general', GeneralPreview);
CMS.registerEditorComponent(EditorYoutube);
CMS.registerEditorComponent(AnotherYoutube);
CMS.registerWidget(
  'relationKitchenSinkPost',
  'relation',
  RelationKitchenSinkPostPreview
);

export default CMS;
