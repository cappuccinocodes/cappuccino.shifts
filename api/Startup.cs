using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using api.Data;
using api.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace api
{
    public class TimeSpanToStringConverter : JsonConverter<TimeSpan>
{
    public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value=reader.GetString();
        return TimeSpan.Parse(value);
    }

    public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}
    public class Startup
    {
        
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers()
            .AddJsonOptions(options=>
            options.JsonSerializerOptions.Converters.Add(new TimeSpanToStringConverter()))
            .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IEmployerRepository, EmployerRepository>();
            services.AddScoped<IShiftRepository, ShiftRepository>();

            // services.AddDbContext<DataContext>(x =>
            // x.UseSqlite(_config.GetConnectionString("local")));
            services.AddDbContext<DataContext>(options
                => options.UseSqlServer(_config.GetConnectionString("remote")));

            services.AddCors(opt => opt.AddPolicy("CorsPolicy",
            policy =>
                        {
                            policy.WithOrigins("http://cappuccinoshifts.azurewebsites.net", "https://cappuccinoshifts.azurewebsites.net")
                                  .AllowAnyMethod()
                                  .AllowAnyHeader();


                            // policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:8100", "http://localhost:8101" );
                        }));

//                         services.AddCors(options =>
// {
//     options.AddPolicy("CorsPolicy", builder => builder.WithOrigins("http://cappuccinobudget.azurewebsites.net")
//         .AllowAnyHeader()
//         .AllowAnyMethod()
//         .AllowCredentials()
//         .SetIsOriginAllowed((host) => true));
// });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
