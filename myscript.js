// This script will run in the page


// Make sure we are in mp3.zing.vn page
if (location.href.match(/^http:\/\/mp3\.zing\.vn/)) {
	// We are in mp3.zing.vn

	// Create "music end" event
	var musicEndSrc = "var onMusicEnd = function () {\n\
						var items = document.querySelectorAll('.zing-top-song-item h3 a[href]');\n\
						for (var i = 0; i < items.length; i++) {\n\
							// if not played this song yet\n\
							if (!sessionStorage['zingmp3-related-player-' + items[i].title]) {\n\
								// save to session\n\
								sessionStorage['zingmp3-related-player-' + items[i].title] = true;\
								location.href = items[i].href;\n\
								break;\n\
							}\n\
						}\n\
					};\n\n";


	// Hook in the the "music end" event (from Flash)
	// This took a white to find out the right method to hook in.
	var src = "var __temp = __flash__toXML;\n\
		__flash__toXML = function () {\n\
	    	__temp.apply(__temp, arguments);\n\
	    	onMusicEnd();\n\
		};\n\n";
	var script = document.createElement('script');
	script.innerHTML = musicEndSrc + src;

	setTimeout(function () {
		document.body.appendChild(script);
		console.log('ZingMp3 Related Player Initiated!');
	}, 5000);
}


