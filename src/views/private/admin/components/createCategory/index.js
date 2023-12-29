import React from "react";
import CustomInputFields from "../../../../../components/atoms/customInput";
import CustomButton from "../../../../../components/atoms/customButton";


export default function CreateCategory()
{
    return(
        <>
         <section>
            <div className="conatiner">
               <div className="row">
                    <div>
                        <form>
                            <CustomInputFields type="text" placeholder="smartphone..." className="form-control"></CustomInputFields>
                            <CustomButton type="submit "></CustomButton>
                        </form>
                    </div>
               </div>
            </div>
         </section>
        
        </>
    )
}