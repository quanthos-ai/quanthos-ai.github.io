import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CRED_PATH = process.env.GOOGLE_OAUTH_CREDENTIALS || path.resolve('servers', 'gcp-oauth.keys.json');
const TOKEN_PATH = process.env.GOOGLE_OAUTH_TOKEN || path.resolve('servers', 'gcp-oauth.token.json');

function readJson(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

async function main() {
  if (!fs.existsSync(CRED_PATH)) {
    console.error(`Credentials file not found at: ${CRED_PATH}`);
    process.exit(1);
  }
  const credentials = readJson(CRED_PATH);
  const installed = credentials.installed || credentials.web;
  if (!installed) {
    console.error('Invalid credentials JSON: expected "installed" or "web" object');
    process.exit(1);
  }
  const { client_secret, client_id, redirect_uris = ['http://localhost'] } = installed;
  const redirectUri = redirect_uris[0];
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);

  const argCode = process.argv.find(a => a.startsWith('--code='));
  if (argCode) {
    const code = argCode.split('=')[1];
    if (!code) {
      console.error('No code value provided after --code=');
      process.exit(1);
    }
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    writeJson(TOKEN_PATH, tokens);
    console.log(`OAuth tokens saved to: ${TOKEN_PATH}`);
    return;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  console.log('Visit this URL to authorize access:');
  console.log(authUrl);
  console.log('\nThen run:\n  npm run auth -- --code=YOUR_AUTH_CODE_HERE');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
