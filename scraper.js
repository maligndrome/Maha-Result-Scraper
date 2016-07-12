var level=0;
	var globCtr=0;
	var pagesArray=[]; var maxPages=50;
	var link='http://mahresult.nic.in/hsc2016/resultview16.asp';
	//var roll=268645;
	var file = "data:text/plain;charset=utf-8,";
	var logFile = '';
	var commonNames=['sar','sas','sat','sav','see','sha','she','shi','sho','shy','sit','son','sri','shr','sud','sur','sul','sum','sun','sus','swa','tar','tri','uma','ush','val','vas','vid','vij','vim','abh','adi','ahs','ais','aka','ama','ami','amr','ana','ani','anj','ank','ano','anu','arc','aru','ash','aas','aar','art','ava','bal','bha','cha','che','dam','dar','dee','ant','dev','dip','div','dur','esh','gau','git','gop','gow','ila','ind','jas','jay','jyo','kai','kal','kam','kan','ish','kar','kau','kir','kis','kri','kru','ksh','kum','kun','lak','lal','lat','lav','lax','lee','lel','lil','mad','mal','man','may','mir','mee','moh','muk','med','nee','nil','nik','nis','nit','pad','pal','par','poo','pra','pre','pri','pun','pur','pus','rac','rad','raj','ran','ras','rat','res','ris','rit','riy','roh','ruk','rup','san','sar','tab'];
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
					if(globCtr==134) {
						logFile+=('##'+commonNames[globCtr]+':'+roll+'##')+'Not found';
						globCtr=0;
						if(--maxPages){scrapeDataCommon(++roll);}
						else {
					    var encoded = encodeURIComponent(logFile);
					    var a = document.createElement('a');
					    a.href = file+encoded;
					    a.target   = '_blank';
					    a.download = 'data-from-'+(roll-50)+'-to-'+roll;
					    document.body.appendChild(a);
					    a.click();
					    a.remove();
					    globCtr=0;
					    maxPages=50;
					    logFile='';
					    scrapeDataCommon(++roll);
					}
					} else {
						++globCtr;
						scrapeDataCommon(roll);
					}
				}else{
					logFile+=('##'+commonNames[globCtr]+':'+roll+'##')+(data.slice(3011,data.indexOf('</table>')));
					logFile+=('$$$$$');
					globCtr=0;
					if(--maxPages){scrapeDataCommon(++roll);}
					else {
					    var encoded = encodeURIComponent(logFile);
					    var a = document.createElement('a');
					    a.href = file+encoded;
					    a.target   = '_blank';
					    a.download = 'data-from-'+(roll-50)+'-to-'+roll;
					    document.body.appendChild(a);
					    a.click();
					    a.remove();
					    globCtr=0;
					    maxPages=50;
					    logFile='';
					    scrapeDataCommon(++roll);
					}
				}
			}
		);
	};
