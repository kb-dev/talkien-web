import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Body from 'components/SearchBody';
import DataFetcher from 'tools/DataFetcher';

import './management.scss';

class ManagementPage extends React.Component<any> {
	public render() {
		return (
			<div className="management-container">
				<object data={logo} className="TalkienLogo" />
				<div className="container">
					<div className="title-management-page">Open-Source et Collaboratif </div>
					<p className="text">
						Talkien est un outil fait par et pour la communauté.
						<br /> <br />
						Si vous souhaitez aider à maintenir à jour les données de Talkien, vous
						pouvez pleinement le faire en vous connectant à l’interface de gestion via
						un identifiant GitHub.
						<br />
						<br /> Nous utilisons un répertoire GitHub pour conserver et fournir les
						données aux différentes applications. L’application utilise donc votre
						identification pour soumettre des Pull Requests quand vous souhaitez faire
						une modification sur les événements ou les conférences.
						<br />
						<br /> Votre identification et vos données ne sont stockés sur aucun
						serveur. Tout ceci reste en local dans votre navigateur.
						<br />
						<br /> Vous pouvez consulter le code de cette application à cet endroit si
						vous souhaitez vérifier par vous-même.
					</p>
					<div className="button-block">
						<div className="clickhere">Se connecter via GitHub</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ManagementPage;
