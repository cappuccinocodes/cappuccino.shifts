using System;
using System.Collections.Generic;
using api.Data.Repositories;
using api.Entities;
using api.Entities.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController] 
    [Route("api/shifts")]
    public class ShiftsController: ControllerBase
    {
        private readonly IShiftRepository _shiftRepository;
        private readonly IMapper _mapper;
        public ShiftsController(IShiftRepository shiftRepository, IMapper mapper)
        {
            _shiftRepository = shiftRepository ??
            throw new ArgumentNullException(nameof(shiftRepository));

            _mapper = mapper ??
            throw new ArgumentNullException(nameof(mapper));
        }
        [HttpGet()] 
        public ActionResult<IEnumerable<Shift>> GetShifts()
        {
            var shiftsFromRepo = _shiftRepository.GetShifts();
            foreach (Shift shift in shiftsFromRepo) {
                // shift.ShiftStart = shift.ShiftStart.ToLocalTime();
                // shift.Start1 = shift.Start1.ToLocalTime();
                // Console.WriteLine(shift.ShiftStart);
            }

            //return Ok(_mapper.Map<IEnumerable<shiftDto>>(shiftsFromRepo));
            return Ok(shiftsFromRepo);
        }

        [HttpGet("{shiftId}", Name = "Getshift")] 
        public IActionResult GetShift(int shiftId)
        {
            var shiftFromRepo = _shiftRepository.GetShift(shiftId);

            if (shiftFromRepo == null)
            {
                return NotFound();
            }

            return Ok(shiftFromRepo);
        }

        [HttpPost]
        public ActionResult<ShiftDto> Createshift(ShiftForCreationDto shift)
        {
            var shiftEntity = _mapper.Map<Shift>(shift);
            _shiftRepository.AddShift(shiftEntity);
            _shiftRepository.Save();

            var shiftToReturn = _mapper.Map<ShiftDto>(shiftEntity);
            return CreatedAtRoute("Getshift",
               new { shiftId = shiftToReturn.Id },
               shiftToReturn);
        }

        [HttpDelete("{shiftId}")]
        public ActionResult Deleteshift(int shiftId)
        {
            Console.WriteLine("I was called");
            var shiftFromRepo = _shiftRepository.GetShift(shiftId);

            if (shiftFromRepo == null)
            {
                return NotFound();
            }

            _shiftRepository.DeleteShift(shiftFromRepo);
            _shiftRepository.Save();

            return NoContent();
        }

        // HAVEN'T TESTED YET, DECIDED TO ONLY USE PUT IN MY IMPLEMENTATION
        [HttpPatch("{shiftId}")]
        public ActionResult PatchShift(int shiftId,  JsonPatchDocument<ShiftForUpdateDto> patchDocument)
        {
              var shiftFromRepo = _shiftRepository.GetShift(shiftId);

                if (shiftFromRepo == null)
                {
                    return NotFound();
                }

                var shiftToPatch = _mapper.Map<ShiftForUpdateDto>(shiftFromRepo);

                patchDocument.ApplyTo(shiftToPatch);
                
                _mapper.Map(shiftToPatch, shiftFromRepo);

                _shiftRepository.UpdateShift(shiftFromRepo);
                //mapper modify the entity, so update isn't needed in this implementation

                _shiftRepository.Save();

                return NoContent();
        }

        
        [HttpPut("{shiftId}")]
        public ActionResult UpdateShift(int shiftId, ShiftForUpdateDto shift)
        {
               
                var shiftFromRepo = _shiftRepository.GetShift(shiftId);

                if (shiftFromRepo == null)
                {
                    return NotFound();
                }

                _mapper.Map(shift, shiftFromRepo);

                _shiftRepository.UpdateShift(shiftFromRepo);
                //mapper modify the entity, so update isn't needed in this implementation

                _shiftRepository.Save();

            return NoContent();
        }



    }
}