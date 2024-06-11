import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import './tiptap.css';
import Menubar from './Menubar';

const Tiptap = ({ onChange, content }) => {
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		content: content,

		onUpdate: ({ editor }) => {
			// onChange(editor.getHTML());
			console.log(editor.getHTML());
		}
	});

	return (
		<div className='text__editor'>
			<Menubar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default Tiptap;
