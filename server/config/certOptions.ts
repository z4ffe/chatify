import fs from 'fs'
import * as path from 'path'

const privateKeyPath = path.join('certs', 'dev', 'private-key.pem')
const certificatePath = path.join('certs', 'dev', 'certificate.pem')

const privateKey = fs.readFileSync(privateKeyPath, 'utf-8')
const certificate = fs.readFileSync(certificatePath, 'utf-8')

export const credentials = {
	key: privateKey,
	cert: certificate
}