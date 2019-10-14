export default getCurrentPosition = () => {
  return new Promise(async (resolve, reject) => {
    await navigator.geolocation.getCurrentPosition(
      //pega a posição atual
      pos => {
        //cria o objeto no formato correto com os dados de posição atuais
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        resolve(coordsEvent);
      },
      err => {
        reject(err);
      }
    );
  });
};
