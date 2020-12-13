using GraphQL.Types;
using BingoProyect.Models;
using BingoProyect.Repositories;

namespace  BingoProyect.GraphQL.Types 
{
    class NumeroType : ObjectGraphType<Numero>
    {
        public NumeroType()
        {
            Name = "Numero";
            Field(x => x.Id).Description("Id of the number");
            Field(x => x.Num).Description("Number");
        }
    }
}