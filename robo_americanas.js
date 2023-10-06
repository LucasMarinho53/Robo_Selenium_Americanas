const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function searchPlaystation() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    try {
        // Acessar o site das Americanas
        await driver.get('https://www.americanas.com.br/');

        // Aguardar até que o campo de pesquisa esteja visível
        let searchBox = await driver.wait(until.elementLocated(By.css('.search__InputUI-sc-1wvs0c1-2')), 10000);

        // Enviar a pesquisa
        await searchBox.sendKeys('Playstation', Key.RETURN);

        // Aguardar até que os resultados da pesquisa sejam carregados e clicar no primeiro produto
        await driver.wait(until.elementLocated(By.css('.inStockCard__Link-sc-rxnoa5-1')), 10000).click();

        // Aguardar até que a página do produto seja carregada e pegar o preço
        let priceElement = await driver.wait(until.elementLocated(By.css('.styles__PriceText-sc-1o94vuj-0')), 10000);
        let price = await priceElement.getText();

        // Mostrar o preço no console
        console.log(`Preço do produto: ${price}`);
    } finally {
        // Fechar o navegador
        await driver.quit();
    }
}

searchPlaystation();