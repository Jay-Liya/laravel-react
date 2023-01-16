<?php

namespace App\Http\Controllers\API;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index (Request $request)
    {
        $employees = Employee::all();
        return response()->json([
            'status'=> 200,
            'employees'=>$employees,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=> 'required|min:2',
            'phone'=> 'required|min:6',
            'email'=> 'required|unique:employees| |email',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $employee = new Employee() ;
            $employee->name = $request->input('name') ;
            $employee->phone= $request->input('phone') ;
            $employee->email = $request->input('email') ;
            $employee->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Thank you for your response!',
            ]);
        }
    }

    public function edit($id)
    {
        $employee = Employee::find($id);
        if($employee)
        {
            return response()->json([
                'status'=> 200,
                'employee' => $employee,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No employee ID Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'email'=> 'required|email',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $employee = Employee::find($id);
            if($employee)
            {
                $employee = Employee::find($id);
                $employee->name = $request->input('name') ;
                $employee->phone= $request->input('phone') ;
                $employee->email = $request->input('email') ;
                $employee->save();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Employee ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);
        if($employee)
        {
            $employee->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Employee Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Employee ID Found',
            ]);
        }
    }
}
