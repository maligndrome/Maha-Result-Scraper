//var checkOK = "PNRMXVSTW";
var level=0;
	var globCtr=0;
	var maxPages=50;
	var link='http://mahresult.nic.in/hsc2016/resultview16.asp';
	//var roll=268645;
	var file = "data:text/plain;charset=utf-8,";
	var logFile = '';
	var commonNames=['sha','ana','sun','ani','mal','bha','man','git','shi','lat','ush','cha','ant','sar','sar','ila','chh','ind','jyo','may','mee','sum','san','ami','lal','sav','anj','sur','lax','mad','dur','shr','see','par','kun','she','aru','ama','kir','kal','dev','anu','tar','esh','vid','rad','nee','chi','vij','raj','lee','uma','sho','jay','pri','pra','kam','nil','rat','tab','nit','ano','ash','aka','rit','poo','son','pad','swa','mir','ree','dip','tri','ank','nis','muk','art','ruk','ava','amr','sud','rup','pur','pal','dha','ram','sit','dee','vin','pre','kau','yam','sat','mon','var','kan','sak','ran','ish','vim','ras','gau','gop','kaj','sul','kum','roh','pun','ksh','sam','che','sah','sad','moh','nik','div','kis','pus','shy','ais','yas','day','kar','jas','bal','arc','vas','vai','sri','rac','dar','val','sus','rud','riy','lak','adi','ris','kai','aas','res','lil','dam','lav','kri','abh','aar','yag','sas','mou','med','lel','kru','gow','ahs'];
	scrapeDataCommon = function(roll) {
		$.post('http://mahresult.nic.in/hsc2016/resultview16.asp',
			{regno:'M'+roll,mname:commonNames[globCtr]}, 
			function(data){
				if(data.indexOf('bg-danger')>-1){
					if(globCtr==153) {
						logFile+=('##'+roll+'##')+'Not found';
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
					logFile+=(('##'+commonNames[globCtr]+':'+roll+'##')+(data.slice(3011,data.indexOf('</table>')))).replace(/\s/g," ");
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
		).fail(function(){
			var globCtr=0;
			var maxPages=50;
			scrapeDataCommon(roll);
		});
	};
