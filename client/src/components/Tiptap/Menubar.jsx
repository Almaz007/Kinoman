import {
	FaBold,
	FaItalic,
	FaRedo,
	FaStrikethrough,
	FaUnderline,
	FaUndo
} from 'react-icons/fa';

import cn from 'classnames';
import styles from './menubar.module.css';

const Menubar = ({ editor }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className={styles['menubar']}>
			<div className={styles['text__edit']}>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={cn(
						editor.isActive('bold') ? styles['is_active'] : '',
						styles['btn']
					)}
				>
					<FaBold />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={cn(
						editor.isActive('italic') ? styles['is_active'] : '',
						styles['btn']
					)}
				>
					<FaItalic />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={cn(
						editor.isActive('underline') ? styles['is_active'] : '',
						styles['btn']
					)}
				>
					<FaUnderline />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={cn(
						editor.isActive('strike') ? styles['is_active'] : '',
						styles['btn']
					)}
				>
					<FaStrikethrough />
				</button>
			</div>
			<div className='forward__backward'>
				<button
					className={styles['btn']}
					onClick={() => editor.chain().focus().undo().run()}
				>
					<FaUndo />
				</button>
				<button
					className={styles['btn']}
					onClick={() => editor.chain().focus().redo().run()}
				>
					<FaRedo />
				</button>
			</div>
		</div>
	);
};

export default Menubar;
