

var gitusers = [	'bashir-panjshiri','EvertdeVries','Callisto79','R3NOCP','erwinsnijder',
					'HarrietKiyai','jellevanderschaaf','JoskedeJong','Ludelaplu','tzanto',
					'Aletta104','drohnwynandrt','OHiddema','SamirHartlief','Aarnoud-Meijer','DJLemstra',
					'JaccoGritter','LanaSijsling','jdereus87','supersmitty2018','IvoJongmans'	];

var commitmap = new Map();
var repomap = new Map();


function countCommits(susername, sreponame) {


	//api.github.com/repos/:user/repositoryNameFromArray/commits?author=:user 
  $.ajax({
        url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits?author="  + susername,
    	
        // url: "https://api.github.com/rate_limit",
        headers: { Authorization: "Basic " + GITAUTH },
		success: function(result){
			
				console.log(susername + "." + sreponame + " : " + result.length);
				let oldcommits = 0;
				if (commitmap.get(susername) != null)
				  oldcommits =  commitmap.get(susername);

				commitmap.set(susername, oldcommits + result.length);

		
				}

			//$('#div1').html( $('#div1').html() + "<BR>" + currentuser + ": " + result.length); 
      		
    	});



}



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

				for (var gitrepo of result) {
					let currentreponame = gitrepo.name;

					let oldrepos = 0;
					if (repomap.get(currentuser) != null)
					  oldrepos =  repomap.get(currentuser);

					repomap.set(currentuser, oldrepos + 1);

					//console.log(currentrepo.name);
					countCommits(currentuser, currentreponame);
				}

	      		
	    	}

	    });


	   } // end for gitusers


	}); // end click


});




