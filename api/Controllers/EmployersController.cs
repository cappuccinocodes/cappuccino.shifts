using System;
using System.Collections.Generic;
using api.Data.Repositories;
using api.Entities;
using api.Entities.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace cappuccino.ionicFinance.api.Controllers
{
    [ApiController] 
    [Route("api/employers")]
    public class EmployersController: ControllerBase
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IMapper _mapper;
        public EmployersController(IEmployerRepository employerRepository, IMapper mapper)
        {
            _employerRepository = employerRepository ??
            throw new ArgumentNullException(nameof(employerRepository));

            _mapper = mapper ??
            throw new ArgumentNullException(nameof(mapper));
        }
        [HttpGet()] 
        public ActionResult<IEnumerable<Employer>> GetEmployers()
        {
            var employersFromRepo = _employerRepository.GetEmployers();

            //return Ok(_mapper.Map<IEnumerable<employerDto>>(employersFromRepo));
            return Ok(employersFromRepo);
        }

        [HttpGet("{employerId}", Name = "GetEmployer")] 
        public IActionResult GetEmployer(int employerId)
        {
            Console.WriteLine("Get Employer id" + employerId);
            var employerFromRepo = _employerRepository.GetEmployer(employerId);

            if (employerFromRepo == null) 
            {
                return NotFound();
            }

            return Ok(employerFromRepo);
        }

        [HttpPost]
        public ActionResult<EmployerDto> CreateEmployer(EmployerForCreationDto employer)
        {
            var employerEntity = _mapper.Map<Employer>(employer);
            _employerRepository.AddEmployer(employerEntity);
            _employerRepository.Save();

            var employerToReturn = _mapper.Map<EmployerDto>(employerEntity);
            return CreatedAtRoute("GetEmployer",
               new { employerId = employerToReturn.Id }, 
               employerToReturn);
        }

        [HttpDelete("{employerId}")]
        public ActionResult DeleteEmployer(int employerId)
        {
            Console.WriteLine("Employer id" + employerId);
            var employerFromRepo = _employerRepository.GetEmployer(employerId);

            if (employerFromRepo == null)
            {
                return NotFound();
            }

            _employerRepository.DeleteEmployer(employerFromRepo);
            _employerRepository.Save();

            return NoContent();
        }


    }
}