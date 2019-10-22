import React from 'react';

import Button from 'atoms/Button';
import Input from 'atoms/Input';
import logo from 'assets/LogoTalkien.svg';
import Body from 'components/SearchBody';
import DataFetcher from 'tools/DataFetcher';
import Github from 'tools/Github';

import './management.scss';

class ManagementPage extends React.Component<any> {
	private goToGithubAuthentication = () => {
		Github.getAuthURL().then((url) => {
			window.location.replace(url);
		});
	};

	public render() {
		return (
			<div className="management-container">
				<object data={logo} className="talkien-logo" />
				<div className="container">
					<div className="title-management-page">Open-Source et Collaboratif</div>
					<div className="text-scroll-container">
						<p className="text">
							Talkien est un outil fait par et pour la communauté.
							<br /> <br />
							Si vous souhaitez aider à maintenir à jour les données de Talkien, vous
							pouvez pleinement le faire en vous connectant à l’interface de gestion
							via un identifiant GitHub.
							<br />
							<br /> Nous utilisons un répertoire GitHub pour conserver et fournir les
							données aux différentes applications. L’application utilise donc votre
							identification pour soumettre des Pull Requests quand vous souhaitez
							faire une modification sur les événements ou les conférences.
							<br />
							<br /> Votre identification et vos données ne sont stockés sur aucun
							serveur. Tout ceci reste en local dans votre navigateur.
							<br />
							<br /> Vous pouvez consulter le code de cette application à cet endroit
							si vous souhaitez vérifier par vous-même.
						</p>
					</div>
					<div className="button-block">
						<Button className="connect-button" onClick={this.goToGithubAuthentication}>
							Se connecter via GitHub
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default ManagementPage;
