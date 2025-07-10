# TO-DO:

- have to send the authToken with each API call.

# IDEAS:

- Will provide analytics for the links as well , like bitly does
- Should also create a db check for already hashed URLs so for the same url we don't create a new hash, it will save memory and hence further check sample space will reduce as the check loop has to be done on less data, meaning ,
  one HASH will be mapped -> to one URL and one URL can have -> only one HASH mapped to it
