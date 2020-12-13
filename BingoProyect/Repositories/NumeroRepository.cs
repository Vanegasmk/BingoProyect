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
    class NumeroRepository
    {
        private readonly DataBaseContext _context;
        public NumeroRepository(DataBaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Numero> All(ResolveFieldContext<object> context){
            var results = from numeros in _context.Numeros select numeros;

            if (context.HasArgument("num"))
            {
                var value = context.GetArgument<int>("num");
                results = results.Where(a => a.Num == value);
            }

            return results;
        }

        public async Task<Numero> Add(Numero numero) {
            _context.Numeros.Add(numero);
            await _context.SaveChangesAsync();
            return numero; 
        }

         public async Task<Numero> Remove(long id) {
            var numero = await _context.Numeros.FindAsync(id);
            if (numero == null)
            {
                return null;
            }
            _context.Numeros.Remove(numero);
            await _context.SaveChangesAsync();
            return numero;
        }
    }
}