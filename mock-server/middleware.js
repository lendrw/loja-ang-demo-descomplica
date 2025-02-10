const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  // Intercepta requisições de registro
  if (req.method === 'POST' && req.path === '/auth/register') {
    const userData = req.body;
    
    // Lê o arquivo db.json
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Verifica se o email já existe
    const existingUser = db.users.find(u => u.email === userData.email);
    if (existingUser) {
      res.status(400).json({ message: 'Email já cadastrado' });
      return;
    }
    
    // Cria novo usuário
    const newUser = {
      id: db.users.length + 1,
      ...userData,
      role: 'student',
      enrolledCourses: []
    };
    
    // Adiciona o usuário ao banco
    db.users.push(newUser);
    
    // Salva o arquivo
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    // Remove a senha antes de enviar a resposta
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Cria resposta com token
    const response = {
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${newUser.role}.${Date.now()}`,
      user: userWithoutPassword
    };
    
    res.status(201).json(response);
    return;
  }

  // Continua para outras rotas
  next();
} 