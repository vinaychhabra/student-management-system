var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins = "_MyAllowSpecificOrigins";

builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder
                .SetIsOriginAllowed(_ => true)  // Allow any origin
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); // Allow credentials if your frontend sends credentials (e.g., cookies)
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins); // Enable CORS by including this line

app.UseAuthorization();

app.MapControllers();

app.Run();
