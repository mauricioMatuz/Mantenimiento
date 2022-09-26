const AWS = require ( ' aws - sdk ' ) ;
const s3 = new AWS.S3 ( {
      accessKeyId : "TE LO DA AL CREAR EL I'M" ,
      secretAccesskey : "CUANDO CREAS EL USER"
} ) ;

s3.listBuckets ( { } , ( err , data ) => {
      if ( err ) throw err ;
      console.log ( data ) ;
  } ) ; //LISTA LOS BUCKETS

//PARA SELECCIONAR EL BUCKET
var parametros = {
      Bucket : ' appdelante - s3 - demo '
}
s3.listobjectsV2 ( parametros , ( err , data ) => {
    if ( err ) throw err ;
    console.log ( data ) ;
} )//PARA LISTAR LO QUE TIENE UN BUCKET ESPECIFICO

var parametrosGetObject = {
      Bucket : ' appdelante - s3 - demo ' ,
      Key : ' imagenes / gib_chrome.png '
}
s3.getObject ( parametrosGetObject , ( err , data ) => {
    if ( err ) throw err ;
    console.log ( data ) ;
    //fs.write("nombre que quieres que se descarge",data.body,"binary") ; asi se descarga y guarda
} )

fs . readFile ( " informacion.txt " , ( err , data ) => {
      if ( err ) throw err ;
      var parametrosPutObject = {
            Bucket : ' appdelante - s3 - demo ' ,
            Key : ' informacion.txt ' ,
            Body : data
      }
      s3.putObject ( parametros PutObject , ( err , data ) => {
            if ( err ) throw err ;
            console.log ( data ) ;
       } )
  } )
           
//! npm install aws-sdk
                    