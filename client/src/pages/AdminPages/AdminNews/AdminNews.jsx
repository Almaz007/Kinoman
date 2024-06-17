import AuthPageTitle from '../../../components/AuthPageTitle/AuthPageTitle';
import Tiptap from '../../../components/Tiptap/Tiptap';

export default function AdminNews() {
	return (
		<div>
			<AuthPageTitle title='Новости' />
			<br />
			<Tiptap content={'Введи текст'} />
		</div>
	);
}
