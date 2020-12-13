using GraphQL.Types;
using BingoProyect.Models;

namespace  BingoProyect.GraphQL.Types 
{
    class NumeroInputType : InputObjectGraphType
    {
        public NumeroInputType()
        {
            Name = "NumeroInputType";
            Field<NonNullGraphType<IntGraphType>>("num");
        }
    }
}