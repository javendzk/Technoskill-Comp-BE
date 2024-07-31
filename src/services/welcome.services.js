const welcomeMessage = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Teggnoskyl</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: "Roboto", sans-serif;
                background-color: #0F0F10;
                letter-spacing: 0.7px;
            }
            .container {
                text-align: center;
                padding-bottom: 20px;
                padding-top: 5px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                background-color: #212125;
                border-radius: 10px;
                width: 300px;
            }
            h1 {
                color: white;
                font-size: 45px;
                margin-bottom: 1px;
                font-weight: 600;

            }
            p {
                color: white;
                font-size: 16px;
                font-weight: 200;
            }
            a {
                color: #FF8901;
                text-decoration: none;
                text-shadow: 0 0 10px #FF8901, 0px 0px 9px rgba(255,137,1,0.34);
                font-weight: 300;
                font-size: 16px;
            }
            a:hover {
                text-decoration: underline;
            }
            .dot {
                font-size:15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Teggnoskyl<span class="dot">■</span></h1>
            <p>Are you lost, my guy? Return <a href="#">here</a></p>
        </div>
    </body>
</html>`;

module.exports = welcomeMessage;