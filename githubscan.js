

var gitusers = [	'bashir-panjshiri','EvertdeVries','Callisto79','R3NOCP','erwinsnijder',
					'HarrietKiyai','jellevanderschaaf','JoskedeJong','Ludelaplu','tzanto',
					'Aletta104','drohnwynandrt','OHiddema','SamirHartlief','Aarnoud-Meijer','DJLemstra',
					'JaccoGritter','LanaSijsling','jdereus87','supersmitty2018','IvoJongmans'	];


$(document).ready(function(){
    

	$('#scanbutton').click(function() {


	  for (var gituser of gitusers)
	  {


	    let currentuser = gituser;

	    $.ajax({
	        url: "https://api.github.com/users/" + gituser + "/repos",
	    	
	        headers: { Authorization: "Basic " + GITAUTH },
			success: function(result){

				console.log(result);
	      		
	    	}

	    });


	   } // end for gitusers


	}); // end click


});




