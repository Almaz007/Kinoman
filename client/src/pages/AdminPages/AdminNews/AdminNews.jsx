import AdminPageTitle from '../../../components/AdminPageTitle/AdminPageTitle';
import Tiptap from '../../../components/Tiptap/Tiptap';

export default function AdminNews() {
	return (
		<div>
			<AdminPageTitle title='Новости' />
			<br />
			<Tiptap content={'Введи текст'} />
		</div>
	);
}
