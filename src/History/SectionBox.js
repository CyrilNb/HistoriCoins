import React from 'react';
import PropTypes from 'prop-types';

export const SectionBox = ({price}) =>
	<div className="history--section__box__inner">
		<h4>{price.date}</h4>
		<div className="columns">
			<div className="column">
				<p>1 BTC = ${price.btc}</p>
			</div>
			<div className="column">
				<p>1 ICX = ${price.icx}</p>
			</div>
			<div className="column">
				<p>1 NANO = ${price.nano}</p>
			</div>
		</div>
	</div>;

SectionBox.propTypes = {
	price: PropTypes.object.isRequired
};

SectionBox.defaultProps = {
	price: {
		date: '',
		btc: 0,
		icx: 0,
		nano: 0
	}
};