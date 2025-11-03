sap.ui.define(
        [],
        function() {
            return {
                validaCNPJ(cnpj) {
                    const charToValue = function(ch) { // converte caractere para valor conforme regra (ASCII - 48)                    
                        return ch.charCodeAt(0) - 48;
                    }

                    const calcularDV = function(base, pesos) {
                        let soma = 0;
                        for (let i = 0; i < base.length; i++) {
                            soma += charToValue(base[i]) * pesos[i];
                        }
                        let resto = soma % 11;
                        return (resto < 2) ? 0 : 11 - resto;
                    }

                    // remove caracteres que não sejam letra/número                
                    cnpj = cnpj.replace(/[^a-zA-Z0-9]/g, '');

                    if (cnpj.length !== 14) return false; // tamanho fixo

                    // separa parte base e DVs informados                
                    let base12 = cnpj.substring(0, 12);
                    let dvInformado1 = charToValue(cnpj[12]);
                    let dvInformado2 = charToValue(cnpj[13]);

                    // pesos primeiro DV                
                    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                    let dv1 = calcularDV(base12, pesos1);

                    // pesos segundo DV                
                    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                    let base13 = base12 + String.fromCharCode(dv1 + 48); // concatena DV1 convertido p/ char                
                    let dv2 = calcularDV(base13, pesos2);

                    return (dv1 === dvInformado1 && dv2 === dvInformado2);
                }
            }
        )
