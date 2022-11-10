### Generate private key
openssl genrsa -out private.pem 3072

### Generate public key from private key
openssl rsa -in private.pem -pubout -out public.pem