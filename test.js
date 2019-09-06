  function exportergraphxml()
{
    
    var liste_utilisateur = [] ;                                       
    var width_relation = 0;
    var ctr = 0;
    var ancien_poids = 40;
    var ancien_poids2 = 0;
    var ancien_poids_trop_gros = false;
    var poids_final = 0;
    
    
    var xmltext ='<?xml version="1.0" encoding="UTF-8"?>\n\<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlnshttp://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">\n';
    
    xmltext = xmltext+'<key id="d0" for="node" attr.name="label" attr.type="string">\n\
<default></default>\n\
</key>\n\
<key id="d3" for="node" attr.name="size" attr.type="double">\n\
<default>12</default>\n\
</key>\n\
<key id="d4" for="node" attr.name="color" attr.type="string">\n\
<default>#CD5C5C</default>\n\
</key>\n\
<key id="d5" for="node" attr.name="shape" attr.type="string">\n\
<default>circle</default>\n\
</key>\n\
<key id="d6" for="node" attr.name="label.color" attr.type="string">\n\
<default>#8d8d8d</default>\n\
</key>\n\
<key id="d7" for="node" attr.name="label.size" attr.type="string">\n\
<default>8</default>\n\
</key>\n\
<key id="d8" for="edge" attr.name="weight" attr.type="double">\n\
<default>1.0</default>\n\
</key>\n\
<key id="d9" for="edge" attr.name="color" attr.type="string">\n\
<default>#666666</default>\n\
</key>\n\
<key id="d10" for="edge" attr.name="label" attr.type="string">\n\
<default></default>\n\
</key>\n\
<graph id="LiGRE" edgedefault="undirected">\n';
    
    
    
    apex.server.process('info_graph',
                        {x01: apex.item("P22_DATE_DEBUT").getValue(),
                         x02 :apex.item("P22_DATE_FIN").getValue(),   
                         x03:0,
                         x04:'NON',
                         x05:apex.item("P22_DATE_FIN").getValue(),
                         x06:0
                        },
                        {
                            success: function (pData2){
                                
                                
                                var info_graph = JSON.parse(pData2);
                                var poid_ordonner = info_graph;
                                
                                // Permet de d'ordonner l'array recu en json par poids, du plus grand au plus petit.                             
                                let sortedInput = info_graph.slice(0).sort((a,b) => b.poids - a.poids);
                                
                                for (x in info_graph) {
                                    
                                    
                                    
                                    if(liste_utilisateur.includes(info_graph[x]['id']) == false)
                                        
                                    {
                                        
                                        
                                        if(info_graph[x]['poids'] == 0)
                                        {
                                            info_graph[x]['poids'] = 10;
                                        }
                                        
                                        
                                        
                                        if(info_graph[x]['poids']>40 && info_graph[x]['poids']<ancien_poids)
                                        {
                                            
                                            ancien_poids = info_graph[x]['poids'];
                                            ancien_poids2 = ancien_poids2-1;
                                            poids_final = ancien_poids2;
                                            
                                        }
                                        
                                        else if(info_graph[x]['poids']>40 && ctr == 0)
                                        {
                                            ancien_poids = info_graph[x]['poids'];
                                            ancien_poids2 = ancien_poids2-1;
                                            poids_final = ancien_poids2;
                                        }
                                        
                                        else
                                        {
                                            ancien_poids = info_graph[x]['poids'];
                                            poids_final = ancien_poids;
                                        }
                                        
                                        
                                        xmltext = xmltext+'<node id = "'+info_graph[x]['id']+'">\n\
<data key = "d3">'+poids_final+'</data>\n\</node>';
                                        
                                        
                                        
                                        liste_utilisateur.push(info_graph[x]['id']);
                                        
                                    }
                                    
                                    
                                    
                                     if(info_graph[x]['id_source'] != '' && info_graph[x]['id_cible'] != '' && liste_array.includes(info_graph[x]['id_source']+info_graph[x]['id_cible']) ==  false)
                                         
                                     {
                                         liste_array.push(info_graph[x]['id_source']+info_graph[x]['id_cible']);
                                         
   
                                         width_relation = info_graph[x]['total_relation']/100;
                                         
                                         
                                         if(width_relation>3) 
                                         {
                                             width_relation = 3;
                                         }
                                         xmltext = xmltext+'<edge id = "e'+info_graph[x]['id_source']+info_graph[x]['id_cible']+'" directed = "true" source = "'+info_graph[x]['id_source']+'" target = "'+info_graph[x]['id_cible']+'">\n\
<data key="d9">#'+info_graph[x]['couleur']+'</data>\n\
<data key="d8">'+width_relation+'</data></edge>\n';
                                                                    
                                                                    
                                                                }
                                     
                                     ctr = ctr+1;                               
                                     
                                 }
                               
                               xmltext = xmltext+'</graph>\n\</graphml>';
                               
                               
                               var filename = "Relations_utilisateurs.GraphML";
                               var pom = document.createElement('a');
                               var bb = new Blob([xmltext], {type: 'text/plain'});
                               
                               pom.setAttribute('href', window.URL.createObjectURL(bb));
                               pom.setAttribute('download', filename);
                               
                               pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
                               pom.draggable = true; 
                               pom.classList.add('dragout');
                               
                               pom.click();
                               
                           },
                         dataType: "text"}
                    );
}


function getRandomColor() {
    
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

