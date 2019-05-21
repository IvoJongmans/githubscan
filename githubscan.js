
// please configure your GITHUB credentials inside config.js 
// to enable the 5000 GitHub API calls/hour limit
//
//   let GITAUTH = btoa("mygithubuser" + ":" + "mygithubpassword");

var gitusers = [	'bashir-panjshiri','EvertdeVries','sietsezwaagstra','R3NOCP','erwinsnijder',
					'HarrietKiyai','jellevanderschaaf','JoskedeJong','LucienKoot','tzanto',
					'Aletta104','drohnwynandrt','OHiddema','SamirHartlief','Aarnoud-Meijer','DJLemstra',
					'JaccoGritter','LanaSijsling','jdereus87','mschmidtcrans','IvoJongmans'];

// shorter test array
// var gitusers = [	'bashir-panjshiri','mschmidtcrans','IvoJongmans'];

var commitmap = new Map();
var repomap = new Map();
var htmlmap = new Map();
var cssmap = new Map();
var javascriptmap = new Map();
var phpmap = new Map();

var commitdates = [];

var commitindex = [];


const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


var currentbootcampdaynumber = dateDiffInDays(new Date("2019/04/29"), new Date()) + 1;




function mylog(message) {
//	console.log(message);
	$('#logdiv').html(message);
}


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


function updateChart(showuser) {


	var res = commitdates.reduce(function(groups, item) {
	    const val = item.username;
    	groups[val] = groups[val] || []
    	groups[val].push(item);
    	return groups
  	}, {});

	console.log(res);	

	xuser = res[showuser];
		
		var res2 = xuser.reduce(function(groups, item) {
		    const val = item.daysfromstart;
	    	groups['days' + val] = groups['days'+val] || 0;
	    	groups['days' + val] = 1 + (groups['days' + val]);
	    	return groups
	  	}, []);

		
		tempdata = [];
		cumscore = 0;
		for (idag = 0; idag < currentbootcampdaynumber; idag++)
		{	
			dagscore = res2['days' + idag] || 0;
			cumscore += dagscore;
			tempdata.push(cumscore);
		}

		/* Add a basic data series with six labels and values */
		var data = {
		  // labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
		  series: [
		    {
		      data: tempdata
		    },
		    {
		      data: [5,10,15,20,25,25,25,35,45,55,65,75,75,75,85,95,105,115,125,125,125, 140,155,170,185,200, 200, 200]
		    }
		    
		  ]
		};


		/* Set some base options (settings will override the default settings in Chartist.js *see default settings*). We are adding a basic label interpolation function for the xAxis labels. */
		var options = {
		  width: 800,
		  height: 400,
		  showPoint: false,
		  axisX: {
		    labelInterpolationFnc: function(value) {
		      return value;
		    }
		  }
		};

		
		/* Initialize the chart with the above settings */
		var xx = new Chartist.Line('#my-chart', data, options);
		console.log(xx);

		// end chart

	
}



function updateReport() {

		mylog('===== GitHub scan ready ===== ');
		
		var tabledata1 = [];

		for (var gituser of gitusers)
	       tabledata1.push({ name : gituser, repocount : repomap.get(gituser), commitcount :  commitmap.get(gituser),  crratio:  round(commitmap.get(gituser) / repomap.get(gituser), 1), htmlbytes :  htmlmap.get(gituser), cssbytes : cssmap.get(gituser), javascriptbytes : javascriptmap.get(gituser), phpbytes : phpmap.get(gituser) });

		var table = new Tabulator("#example-table", {
			height: 400, // set height of table to enable virtual DOM
			autoResize:true,
			data:tabledata1, //load initial data into table
			layout:"fitColumns", //fit columns to width of table (optional)
			columns:[ //Define Table Columns
				{title:"Name", field:"name", sorter:"string", width:200},
				{title:"Repositories", field:"repocount", sorter:"number", align:"left", width: 100},
				{title:"Commits", field:"commitcount", sorter:"number", align:"left", width: 100 },
			    {title:"C/R", field:"crratio", sorter:"number", align:"left", width: 125 },
				{title:"HTML", field:"htmlbytes", sorter:"number", align:"left", width: 125 },
				{title:"CSS", field:"cssbytes", sorter:"number", align:"left", width: 125 },
				{title:"Javascript", field:"javascriptbytes", sorter:"number", align:"left", width: 125 },
				{title:"PHP", field:"phpbytes", sorter:"number", align:"left", width: 125 },

			],
		    rowClick:function(e, id, data, row){ //trigger an alert message when the row is clicked
		    	//alert("Row " + id + " Clicked!!!!");

		    	x = id;
		    	//alert(x._row.data.name);
		    		updateChart(x._row.data.name);
		    	//console.log(data);
		    },
		});



			// commit map bevat voor elke commity een entry
			// nu groeperen per user per dag, dus als op dag 5 meerdere commits zijn voor Jan, deze optellen.
	
// 		var groupBy = function(xs, key) {
//   return xs.reduce(function(rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// };

	// var res = commitdates.reduce(function(groups, item) {
	//     const val = item.username;
 //    	groups[val] = groups[val] || []
 //    	groups[val].push(item);
 //    	return groups
 //  	}, {});

	// console.log(res);	


	// groepeer per username

	

		/// begin chart


		// prepare example data



	}; // end update report
    



function countLanguages(susername, sreponame) {


	//api.github.com/repos/:user/repositoryNameFromArray/commits?author=:user 
  $.ajax({
       // url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/commits?author="  + susername,
    	 url: "https://api.github.com/repos/" + susername  + "/" + sreponame + "/languages",
    	
        // url: "https://api.github.com/rate_limit",
        headers: { Authorization: "Basic " + GITAUTH },
		success: function(result){
									

					let htmlbytes  = 0;
				    if (htmlmap.get(susername) != null)
				  	  htmlbytes =  htmlmap.get(susername);

				  	let addedbytes = result.HTML;
				  	if (addedbytes > 0)
					  htmlmap.set(susername, htmlbytes + addedbytes);
					

					let cssbytes  = 0;
				    if (cssmap.get(susername) != null)
				  	  cssbytes =  cssmap.get(susername);

				  	let addedcssbytes = result.CSS;
				  	if (addedcssbytes > 0)
					  cssmap.set(susername, cssbytes + addedcssbytes);
					

					let javascriptbytes  = 0;
				    if (javascriptmap.get(susername) != null)
				  	  javascriptbytes =  javascriptmap.get(susername);

				  	let addedjavascriptbytes = result.JavaScript;
				  	if (addedjavascriptbytes > 0)
					  javascriptmap.set(susername, javascriptbytes + addedjavascriptbytes);


					let phpbytes  = 0;
				    if (phpmap.get(susername) != null)
				  	  phpbytes =  phpmap.get(susername);

				  	let addedphpbytes = result.PHP;
				  	if (addedphpbytes > 0)
					  phpmap.set(susername, phpbytes + addedphpbytes);



		
				}

			//$('#div1').html( $('#div1').html() + "<BR>" + currentuser + ": " + result.length); 
      		
    	});



}



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

				validcommits = 0;
				
				for (commitentry of result)
					{
						sdatetime = commitentry.commit.author.date;
						sdatetime = sdatetime.split(" ")[0]; 
						sdateCommit    =  new Date(sdatetime);
						sdateStart 	   = new Date("2019/04/29");
						daysfromstart  =  dateDiffInDays(sdateStart, sdateCommit);

						logrow = { username : susername, reponame : sreponame, commitdate : commitentry.commit.author.date, daysfromstart : daysfromstart };
						console.log(logrow);
						commitdates.push(logrow);

						if (daysfromstart >= 0)
							validcommits++;

						commitindex[susername] = commitindex[susername] || [];
				    	commitindex[susername]['days' + daysfromstart] = commitindex[susername]['days'+daysfromstart] || 0;
				    	commitindex[susername]['days' + daysfromstart] = 1 + (commitindex[susername]['days'+daysfromstart]);


					}

					commitmap.set(susername, oldcommits + validcommits);

		
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
						countLanguages(currentuser, currentreponame);
					}
					//updateReport();
									}

	      		
	    	}

	    });


	   } // end for gitusers


	}); // end click


});




