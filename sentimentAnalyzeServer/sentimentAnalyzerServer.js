const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});

function getNLUInstance(){
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: apiKey,
    }),
    serviceUrl: apiUrl,
    });
    return naturalLanguageUnderstanding;
}

app.get("/url/emotion", (req,res) => {
    var NLU = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'emotion': true,
            }
        }
    }; 
    NLU.analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults);
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/url/sentiment", (req,res) => {
        var NLU = getNLUInstance();
    const analyzeParams = {
        'text': req.query.url,
        'features': {
            'entities': {
                'sentiment': true,
            }
        }
    }; 
    NLU.analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults);
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/text/emotion", (req,res) => {
    var NLU = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'emotion': true,
            }
        }
    }; 
    NLU.analyze(analyzeParams).then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/text/sentiment", (req,res) => {
    var NLU = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'sentiment': true,
            }
        }
    }; 
    NLU.analyze(analyzeParams).then(analysisResults => {
        return res.send(analysisResults);
    }).catch(err => {
        return res.send(err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})





