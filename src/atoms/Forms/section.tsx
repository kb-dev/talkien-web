import React, { Component } from 'react';

import Actions, { Dispatch } from '@actions';
import { RootState } from '@reducers';
import { connectedComponentHelper } from '@tools/component';

import DisplayIcon from '@atoms/SVG/Show';

export interface ISectionProps {
	bottomElement?: React.ReactNode;
	children?: React.ReactNode;
	contentClassName?: string;
	contentStyle?: React.CSSProperties;
	className?: string;
	customKey?: number | string;
	fullWidth?: boolean;
	style?: React.CSSProperties;
	title: string;
	titleClassName?: string;
	titleStyle?: React.CSSProperties;

	bottomElementAction?(): void;
}

type State = {
	opened: boolean;
};

const mapStateToProps = (state: RootState) => ({
	settings: state.settings,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const { propsGeneric, connect } = connectedComponentHelper<ISectionProps>()(
	mapStateToProps,
	mapDispatchToProps,
);

class Section extends Component<typeof propsGeneric, State> {
	constructor(props) {
		super(props);

		this.state = {
			opened: props.settings.defaultFormSectionBehavior === 'open',
		};
	}

	private toggleOpen = () => {
		this.setState({
			opened: !this.state.opened,
		});
	};

	public render() {
		const { opened } = this.state;

		return (
			<div
				key={this.props.customKey}
				className={`section section-layer ${
					this.props.className ? this.props.className : ''
				}`}
				style={this.props.style || {}}>
				<div
					className={`section-title ${
						this.props.titleClassName ? this.props.titleClassName : ''
					} ${opened ? 'opened' : ''}`}
					style={this.props.titleStyle || {}}
					onClick={this.toggleOpen}>
					<h4 className="title-name">{this.props.title}</h4>
					<div className={`section-icon ${opened ? 'opened' : 'closed'}`}>
						<DisplayIcon />
					</div>
				</div>
				<div
					style={{
						maxHeight: opened ? '100%' : '0',
						overflow: opened ? 'visible' : 'hidden',
					}}>
					<div className="padding-container">
						<div
							className={`section-container ${
								this.props.contentClassName ? this.props.contentClassName : ''
							} ${this.props.fullWidth ? 'full-width' : ''}`}
							style={this.props.contentStyle || {}}>
							{this.props.children}
						</div>
					</div>
					{this.props.bottomElement && (
						<div
							className={`bottom-container ${
								this.props.bottomElementAction ? 'with-action' : ''
							}`}
							onClick={this.props.bottomElementAction || undefined}>
							{this.props.bottomElement}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default connect(Section);
