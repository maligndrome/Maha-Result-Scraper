var level=0;
	var globCtr=0;
	var pagesArray=[]; var maxPages=300;
	var link='http://mahresult.nic.in/hsc2016/resultview16.asp';
	//var roll=268645;
	var a=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var b=['a','e','i','o','u','b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
		var c=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		nameGen= function() {
			var names=[];
			for(var i=0;i<26;i++){
				for(var j=0;j<26;j++){
					for(var k=0;k<26;k++){
						names.push(a[k]+b[i]+c[j]);
					}
				}
			}
			return names;
		}
	var itrnames=nameGen();
	var commonNames=['sar','sas','sat','sav','see','sha','she','shi','sho','shy','sit','son','sri','shr','sud','sur','sul','sum','sun','sus','swa','tar','tri','uma','ush','val','vas','vid','vij','vim','abh','adi','ahs','ais','aka','ama','ami','amr','ana','ani','anj','ank','ano','anu','arc','aru','ash','aas','aar','art','ava','bal','bha','cha','che','dam','dar','dee','ant','dev','dip','div','dur','esh','gau','git','gop','gow','ila','ind','jas','jay','jyo','kai','kal','kam','kan','ish','kar','kau','kir','kis','kri','kru','ksh','kum','kun','lak','lal','lat','lav','lax','lee','lel','lil','mad','mal','man','may','mir','mee','moh','muk','med','nee','nil','nik','nis','nit','pad','par','poo','pra','pre','pri','pun','pur','pus','rac','rad','raj','ran','ras','rat','res','ris','rit','riy','roh','ruk','rup','san','sar','tab'];
	scrapeData = function(roll) {
		$.post('http://mahresult.nic.in/hsc2016/resultview16.asp',
			{regno:'M'+roll,mname:itrnames[globCtr]}, 
			function(data){ 
				if(data.indexOf('bg-danger')>-1){
					if(globCtr>17575) {
						globCtr=0;
						scrapeData(++roll);
					} else {
						++globCtr;
						scrapeData(roll);
					}
				}else{
					console.log(data);
					console.log('$$$$');
					globCtr=0;
					scrapeData(++roll);
				}
			}
		);
	};
	scrapeDataCommon = function(roll) {
		$.post('http://mahresult.nic.in/hsc2016/resultview16.asp',
			{regno:'M'+roll,mname:commonNames[globCtr]}, 
			function(data){
				if(data.indexOf('bg-danger')>-1){
					if(globCtr==132) {
						console.log('moving on...')
						globCtr=0;
						if(--maxPages){scrapeDataCommon(++roll); console.log(roll);}
					} else {
						++globCtr;
						scrapeDataCommon(roll);
					}
				}else{
					console.log(data.slice(3011,data.indexOf('</table>'))); console.log(commonNames[globCtr]);
					console.log('$$$$$');
					globCtr=0;
					if(--maxPages){scrapeDataCommon(++roll); console.log(roll);}
				}
			}
		);
	};
