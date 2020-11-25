using GraphQL;
using GraphQL.Types;
using BingoProyect.GraphQL.Querys;
using BingoProyect.GraphQL.Mutations;

namespace  BingoProyect.GraphQL {
    class RoomSchema : Schema
    {
        public RoomSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<RoomQuery>(); 
            Mutation = resolver.Resolve<RoomMutation>(); 
        }
    }
}