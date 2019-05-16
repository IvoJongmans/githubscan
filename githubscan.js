
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


function countCommits(susername, sreponame) {


	//api.github.com/repos/:user/repositoryNameFromArray/commits?author=:user 
  $.ajax({
       // url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits?author="  + susername,
    	 url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits",
    	
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


	$('#reportbutton').click(function() {

		console.log('====== report ===== ');
		
		var stats = [];

	//sample data
		var tabledata1 = [
		/*	{id:1, name:"Jan", repocount:12, commitcount:100},
			{id:2, name:"Piet", repocount:4, commitcount:40},
			{id:3, name:"Klaas", repocount:7, commitcount:80},
			{id:4, name:"Toos", repocount:2, commitcount:10},
			{id:5, name:"Toos", repocount:2, commitcount:10},
			{id:6, name:"Toos", repocount:2, commitcount:10},
			{id:7, name:"Toos", repocount:2, commitcount:10},
			{id:8, name:"Toos", repocount:2, commitcount:10},
		*/
		];

		for (var gituser of gitusers)
	    {

	       console.log(gituser + "," + repomap.get(gituser) + ',' + commitmap.get(gituser));
	//       $('#outputdiv').html( $('#outputdiv').html() + "<li>" + gituser + " : " + repomap.get(gituser) + " repos, " + commitmap.get(gituser) + " commits"); 
	  
	       let xrow = { name : gituser, repocount : repomap.get(gituser), commitcount :  commitmap.get(gituser) };
	       tabledata1.push(xrow);
	   }    

		var table = new Tabulator("#example-table", {
			height: 400, // set height of table to enable virtual DOM
			autoResize:true,
			data:tabledata1, //load initial data into table
			layout:"fitColumns", //fit columns to width of table (optional)
			columns:[ //Define Table Columns
				{title:"Name", field:"name", sorter:"string", width:150},
				{title:"Repositories", field:"repocount", sorter:"number", align:"left", formatter:"progress",formatterParams:{legend:true,labelField:"repocount"} },
				{title:"Commits", field:"commitcount", sorter:"number", align:"left", formatter:"progress",formatterParams:{legend:true,labelField:"commitcount"} },

			],
		    rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
		    	alert("Row " + id + " Clicked!!!!");
		    },
		});






	});
    

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




