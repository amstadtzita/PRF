import { MainClass } from '../main_class';

import { NextFunction, Request, Response } from 'express';
import { User } from '../model/User';
import { Product } from '../model/Product';
import bcrypt from 'bcrypt';

module.exports = (passport: any, router: any) => {

    router.get('/', (req: Request, res: Response) => {
        res.status(404).send('This is not an available route, please try /promise or /observable.');
    });


    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', async (err: any, user: any) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).send('User not found');
          }
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
            if (isMatch) {
              console.log('Password matched!');    
              req.login(user, (err) => {
                if (err) {
                  console.error(err);
                  return next(err);
                }
              res.status(200).send(user);
            });

            } else {
              console.log('Invalid password!');
              res.status(401).send('Invalid password');
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    })(req, res, next);
      });

    router.post('/register', (req: Request, res: Response, next: NextFunction) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
    
        const user = new User({
            username: username,
            email: email,
            password: password,
            name: name,
            address: address
        });
    
        User.findOne({username: username}, (err: any, existingUser: any) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error registering new user.');
            } else if (existingUser) {
                res.status(400).send('Username already exists.');
            } else {
                user.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error registering new user.');
                    } else {
                        req.login(user, (error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send('Error logging in new user.');
                            } else {
                                res.status(200).send('User registered and logged in successfully.');
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            req.logout();
            res.status(200).send('Successfully logged out.');
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.write('Waiting for the result from Promise...\n');
        myClass.greetingPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(404).end();
        });
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        myClass.greetingObservable().subscribe((data: string) => {
            res.write(data);
        }, (error: string) => {
            res.status(404).end(error);
        }, () => {
            res.status(200).end();
        });
    });



    router.get('/users', async (req: Request, res: Response) => {
        try {
          const users = await User.find();
          console.log(users)
          res.json(users);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal server error');
        } 
    });

    router.post('/users', async (req: Request, res: Response) => {
        const { username, email, password, name, address } = req.body;

        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).send('User with this email already exists');
          }
      
          const newUser = new User({ username, email, password, name, address });
          const savedUser = await newUser.save();
          res.send(savedUser);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    });

    router.delete('/users', async (req: Request, res: Response) => {
        const { username, email, password, name, address } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(404).send('User not found');
            }
            await user.remove();
            res.status(200).send('User deleted successfully');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    });
      

    router.get('/personal-details', async (req: Request, res: Response, next: NextFunction) => {

      
        // Use the user object as needed
        console.log(req.query.user)

        // Send a response to the client
        res.status(200).send('Personal details page');
/*
        try {
            // Get the user data from the session cookie
            const loggedIn = req.cookies.loggedIn;
            if (!loggedIn) {
              return res.status(401).send('Unauthorized');
            }
            const user = User.findById(req.user);
            if (!user) {
              return res.status(404).send('User not found');
            }
            res.json(user);
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }

*/
        });






    router.get('/products', async (req: Request, res: Response) => {
        try {
        const products = await Product.find();
        res.send(products);
        } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        }
    });
  
    router.post('/products', async (req: Request, res: Response) => {
        const { name, price, description } = req.body;
    
        try {
        const newProduct = new Product({ name, price, description });
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
        } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        }
    });
  
    router.delete('/products', async (req: Request, res: Response) => {
      const { name, price, description } = req.body;

        try {
        const product = await Product.findOne({ name });
        if (!product) {
            return res.status(404).send('Product not found');
        }
    
        await product.remove();
        res.send('Product deleted successfully');
        } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        }
    });




    return router;

};
