using BingoProyect.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GraphQL.Types;
using System;
using System.Security.Cryptography;
using System.Text;

namespace BingoProyect.Repositories
{
    class AdminRepository
    {
        private readonly DataBaseContext _context;
        public AdminRepository(DataBaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Admin> All(ResolveFieldContext<object> context){
            var results = from admins in _context.Admins select admins;

            if (context.HasArgument("email"))
            {
                var value = context.GetArgument<string>("email");
                results = results.Where(a => a.Email.Contains(value));
            }

            if (context.HasArgument("password"))
            {   
                var value = context.GetArgument<string>("password");
                var md5Hash = MD5.Create();
                var sourceBytes = Encoding.UTF8.GetBytes(value);// Byte array representation of source string
                var hashBytes = md5Hash.ComputeHash(sourceBytes);// Generate hash value(Byte Array) for input data
                var hash = BitConverter.ToString(hashBytes).Replace("-", string.Empty);// Convert hash byte array to string
                
                results = results.Where(a => a.Password.Contains(hash.ToLower()));
            }
            return results;
        }

      

    }
}