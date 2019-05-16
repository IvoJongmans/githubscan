
// please configure your GITHUB credentials inside config.js 
// to enable the 5000 GitHub API calls/hour limit
//
//   let GITAUTH = btoa("mygithubuser" + ":" + "mygithubpassword");

var gitusers = [	'bashir-panjshiri','EvertdeVries','Callisto79','R3NOCP','erwinsnijder',
					'HarrietKiyai','jellevanderschaaf','JoskedeJong','Ludelaplu','tzanto',
					'Aletta104','drohnwynandrt','OHiddema','SamirHartlief','Aarnoud-Meijer','DJLemstra',
					'JaccoGritter','LanaSijsling','jdereus87','mschmidtcrans','IvoJongmans'];

var commitmap = new Map();
var repomap = new Map();


function mylog(message) {
//	console.log(message);
	$('#logdiv').html(message);
}


function updateReport() {

		mylog('===== GitHub scan ready ===== ');
		
		var tabledata1 = [];

		for (var gituser of gitusers)
	       tabledata1.push({ name : gituser, repocount : repomap.get(gituser), commitcount :  commitmap.get(gituser) });

		var table = new Tabulator("#example-table", {
			height: 400, // set height of table to enable virtual DOM
			autoResize:true,
			data:tabledata1, //load initial data into table
			layout:"fitColumns", //fit columns to width of table (optional)
			columns:[ //Define Table Columns
				{title:"Name", field:"name", sorter:"string", width:250},
				{title:"Repositories", field:"repocount", sorter:"number", align:"left", width: 100},
				{title:"Commits", field:"commitcount", sorter:"number", align:"left", width: 100 },

			],
		    rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
		    	alert("Row " + id + " Clicked!!!!");
		    },
		});


	};
    

function countCommits(susername, sreponame) {


	//api.github.com/repos/:user/repositoryNameFromArray/commits?author=:user 
  $.ajax({
       // url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits?author="  + susername,
    	 url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits",
    	
        // url: "https://api.github.com/rate_limit",
        headers: { Authorization: "Basic " + GITAUTH },
		success: function(result){
			
				mylog(susername + "." + sreponame + " : " + result.length);
				let oldcommits = 0;
				if (commitmap.get(susername) != null)
				  oldcommits =  commitmap.get(susername);

				commitmap.set(susername, oldcommits + result.length);
				

		
				}

			//$('#div1').html( $('#div1').html() + "<BR>" + currentuser + ": " + result.length); 
      		
    	});



}


$(document).ready(function(){


	
$(document).ajaxStop(function() {
  // place code to be executed on completion of last outstanding ajax call here
  	mylog(" READY" );
  	updateReport();
});



	$('#scanbutton').click(function() {


	  for (var gituser of gitusers)
	  {


	    let currentuser = gituser;
	    mylog(currentuser);

	    $.ajax({
	        url: "https://api.github.com/users/" + gituser + "/repos",
	    	
	        headers: { Authorization: "Basic " + GITAUTH },
			success: function(result){

				mylog(result);

				for (var gitrepo of result) {
					let currentreponame = gitrepo.name;

					//if (gitrepo.fork) alert(currentuser + " . " + currentreponame);


					if (!gitrepo.fork) {
						// do not count forked repos

						let oldrepos = 0;
						if (repomap.get(currentuser) != null)
						  oldrepos =  repomap.get(currentuser);

						repomap.set(currentuser, oldrepos + 1);

						//mylog(currentrepo.name);
		
						countCommits(currentuser, currentreponame);
					}
					//updateReport();
									}

	      		
	    	}

	    });


	   } // end for gitusers


	}); // end click


});




