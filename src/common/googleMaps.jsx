import React from "react";

const GoogleMaps = () => {
	return (
		<div className="google-maps">
			<iframe
				title="google Maps"
				className="maps-iframe"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1017.5672959411737!2d20.813426072467973!3d41.12273954459855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350db638f9e7459%3A0x42f87bbe03051712!2sPitu%20Guli%2023%2C%20Ohrid!5e0!3m2!1sen!2smk!4v1680344133275!5m2!1sen!2smk"
				width="100%"
				height="450"
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	);
};

export default GoogleMaps;
