import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
				<a href="/" class={url == '/' && 'active'}>
					Home </a>
		</header>
	);
}
