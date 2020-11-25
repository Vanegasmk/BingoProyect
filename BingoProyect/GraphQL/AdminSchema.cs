using GraphQL;
using GraphQL.Types;
using BingoProyect.GraphQL.Querys;


namespace  BingoProyect.GraphQL {
    class AdminSchema : Schema
    {
        public AdminSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<AdminQuery>();
        }
    }
}