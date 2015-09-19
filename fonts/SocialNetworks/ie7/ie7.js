/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'SocialNetworks\'">' + entity + '</span>' + html;
	}
	var icons = {
		'Socialhtml5-logo': '&#x48;',
		'Socialcc': '&#xa9;',
		'Socialcc3-logo': '&#x43;',
		'Socialbeatport': '&#xdf;',
		'Socialtripadvisor': '&#x54;',
		'Socialdailymotion': '&#x2202;',
		'Socialother': '&#x6f;',
		'Socialviadeo': '&#x76;',
		'Socialdribbble': '&#x64;',
		'Socialtwitter': '&#x74;',
		'Socialflickr': '&#x46;',
		'Socialfacebook': '&#x66;',
		'Socialskype': '&#xd2;',
		'Socialdigg': '&#x2206;',
		'Socialgoogle': '&#x47;',
		'Socialhtml5': '&#x68;',
		'Sociallinkedin': '&#x6c;',
		'Sociallastfm': '&#xac;',
		'Socialvimeo': '&#x56;',
		'Socialyahoo': '&#x59;',
		'Socialtumblr': '&#x2020;',
		'Socialapple': '&#x61;',
		'Socialwindows': '&#x2039;',
		'Socialyoutube': '&#x79;',
		'Socialdelicious': '&#xe600;',
		'Socialrss': '&#x72;',
		'Socialpicasa': '&#x3c0;',
		'Socialblogger': '&#x62;',
		'Socialwordpress': '&#x77;',
		'Socialamazon': '&#x41;',
		'Socialappstore': '&#xe6;',
		'Socialpaypal': '&#x50;',
		'Socialmyspace': '&#x6d;',
		'Socialdropbox': '&#x44;',
		'Socialwindows8': '&#x57;',
		'Socialpinterest': '&#x70;',
		'Socialgoogle-drive': '&#xfb02;',
		'Socialandroid': '&#xc6;',
		'Socialbehance': '&#x42;',
		'Socialinstagram': '&#x69;',
		'Socialebay': '&#x45;',
		'Socialgoogle-plus': '&#x67;',
		'Socialbit': '&#x222b;',
		'Socialcat': '&#xfb01;',
		'Sociallastfm2': '&#x4c;',
		'Socialrdio': '&#x52;',
		'Socialspotify': '&#x73;',
		'Socialevernote': '&#x65;',
		'Socialsoundcloud': '&#x53;',
		'Socialcircles': '&#x63;',
		'Socialsmashing': '&#x2211;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/Social[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
